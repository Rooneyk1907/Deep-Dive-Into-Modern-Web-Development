import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './NewBlog'
import { describe, expect } from 'vitest'

describe('<NewBlog />', () => {
  let mockCreateBlog
  let container

  beforeEach(() => {
    mockCreateBlog = vi.fn()
    container = render(<NewBlog addBlog={mockCreateBlog} />)
  })

  test('user input is sent when event handler is called ', async () => {
    const titleInput = screen.getByPlaceholderText('Blog Title')
    const authorInput = screen.getByPlaceholderText('Blog Author')
    const urlInput = screen.getByPlaceholderText('Blog URL')

    const user = userEvent.setup()

    await userEvent.type(titleInput, 'This is a Blog')
    await userEvent.type(authorInput, 'John Doe')
    await userEvent.type(urlInput, 'test-url')

    const sendButton = screen.getByText('create')

    await user.click(sendButton)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0].title).toBe('This is a Blog')
    expect(mockCreateBlog.mock.calls[0][0].author).toBe('John Doe')
    expect(mockCreateBlog.mock.calls[0][0].url).toBe('test-url')
  })
})
