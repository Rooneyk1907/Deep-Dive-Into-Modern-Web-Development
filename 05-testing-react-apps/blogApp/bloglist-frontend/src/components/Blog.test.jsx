import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'chai'

describe('<Blog />', () => {
  let container

  const blog = {
    title: 'this is a test title',
    author: 'test author',
    url: 'test url',
    likes: 1,
    user: {
      id: 1234,
    },
  }

  const user = {
    name: 'john doe',
    username: 'johnd',
    id: 1234,
  }

  const mockLikeHandler = vi.fn()
  const mockDeleteHandler = vi.fn()

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        user={user}
        handleLike={mockLikeHandler}
        handleDelete={mockDeleteHandler}
      />
    ).container
  })

  test('title and author are rendered by default - url or likes are not', () => {
    const titleField = screen.getByText('this is a test title')
    const authorField = screen.getByText('test author')
    const div = container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')

    expect(titleField).toBeDefined()
    expect(authorField).toBeDefined()
  })

  test('url and likes are rendered after "show details" button is clicked', async () => {
    const user = userEvent.setup()
    const detailButton = screen.getByText('Show Details')
    await user.click(detailButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: block')
  })

  test('like button calls the event handler twice when like button is called twice', async () => {
    const user = userEvent.setup()
    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})
