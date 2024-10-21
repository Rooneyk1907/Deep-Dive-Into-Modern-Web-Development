import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [detailVisibility, setDetailVisibility] = useState(false)

  const hideWhenVisible = { display: detailVisibility ? 'none' : '' }
  const showWhenVisible = { display: detailVisibility ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const blogDetails = () => {
    const { title, url, id, author, likes } = blog

    return (
      <div style={showWhenVisible}>
        <div>{url}</div>
        <div>
          Likes {likes}
          <span>
            <button onClick={() => handleLike(blog)}>Like</button>
          </span>
        </div>
        <div>{author}</div>

        {blog.user.id === user.id ? (
          <div>
            <button onClick={() => handleDelete(blog)}>Delete</button>
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} <span style={hideWhenVisible}>{blog.author}</span>
        <span style={hideWhenVisible}>
          <button onClick={() => setDetailVisibility(true)}>
            Show Details
          </button>
        </span>
        <span style={showWhenVisible}>
          <button onClick={() => setDetailVisibility(false)}>
            Hide Details
          </button>
        </span>
        {blogDetails()}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
