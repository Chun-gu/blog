import { compileMDX } from 'next-mdx-remote/rsc'

type FileTree = { tree: [{ path: string }] }

export async function getPostByFileName(
  fileName: string
): Promise<BlogPost | undefined> {
  const res = await fetch(
    `https://raw.githubusercontent.com/Chun-gu/blog-posts/main/${fileName}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  )

  if (!res.ok) return undefined

  const rawMDX = await res.text()

  if (rawMDX === '404: Not Found') return undefined

  const { content, frontmatter } = await compileMDX<{
    title: string
    date: string
    tags: string[]
  }>({
    source: rawMDX,
    options: { parseFrontmatter: true },
  })

  const id = fileName.replace(/\.mdx$/, '')

  const blogPost: BlogPost = {
    meta: {
      id,
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags,
    },
    content,
  }

  return blogPost
}

export async function getPostMeta(): Promise<Meta[] | undefined> {
  const res = await fetch(
    'https://api.github.com/repos/Chun-gu/blog-posts/git/trees/main?recursive=1',
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-Github-Api-Version': '2022-11-28',
      },
    }
  )

  if (!res.ok) return undefined

  const fileTree: FileTree = await res.json()

  const fileNames = fileTree.tree
    .map((file) => file.path)
    .filter((path) => path.endsWith('.mdx'))

  // const posts = await Promise.all(
  //   fileNames.map(async (fileName) => {
  //     const post = await getPostByFileName(fileName)
  //     return post?.meta
  //   })
  // )

  const posts = []

  for (const fileName of fileNames) {
    const post = await getPostByFileName(fileName)
    if (post) posts.push(post.meta)
  }
}
