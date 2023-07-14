type FileTree = { tree: [{ path: string }] }

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

  const filePaths = fileTree.tree
    .map((file) => file.path)
    .filter((path) => path.endsWith('.mdx'))
}
