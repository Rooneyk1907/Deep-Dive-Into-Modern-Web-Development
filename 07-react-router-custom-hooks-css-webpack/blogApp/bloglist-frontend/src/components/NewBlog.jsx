import { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlog = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitBlog = (event) => {
    event.preventDefault()
    addBlog({
      title,
      author,
      url,
    })

    setNewBlog('')
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>Create New Blog</h2>
      <form onSubmit={submitBlog}>
        <div>
          title:
          <input
            type='text'
            value={title}
            title='title'
            placeholder='Blog Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            title='author'
            placeholder='Blog Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            title='url'
            placeholder='Blog URL'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

NewBlog.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default NewBlog
