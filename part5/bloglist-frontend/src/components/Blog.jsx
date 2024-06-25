const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}{' '}
    <a href={blog.url} target="_blank">
      link
    </a>
  </div>
);

export default Blog;
