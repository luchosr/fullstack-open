import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'luciano',
    url: 'www.testing.com',
    likes: 4,
  };

  const mockHandler = vi.fn();
  const { container } = render(
    <Blog blog={blog} updateLikes={mockHandler} removeBlog={mockHandler} />
  );
  const div = container.querySelector('.blog');

  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
});

test('blog component should show only a title and an blog author ', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'luciano',
    url: 'www.testing.com',
    likes: 4,
  };

  const mockHandler = vi.fn();
  const { container } = render(
    <Blog blog={blog} updateLikes={mockHandler} removeBlog={mockHandler} />
  );
  const h3 = container.querySelector('.blog-title');
  const h4 = container.querySelector('.blog-author');
  const details = container.querySelector('.togglableContent');

  expect(h3).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
  expect(h4).toHaveTextContent('luciano');
  expect(details).toHaveStyle('display: none');
});

//siempre cuando hay un click es asíncrono (async / await)
test('blog should show blog url and likes when show details button is clicked', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'luciano',
    url: 'www.testing.com',
    likes: 4,
  };

  const mockHandler = vi.fn();
  const { container } = render(
    <Blog blog={blog} updateLikes={mockHandler} removeBlog={mockHandler} />
  );

  const user = userEvent.setup();
  const button = screen.getByText('Show details');

  await user.click(button);

  const div = container.querySelector('.togglableContent');
  const detailsUrl = container.querySelector('.details-url');
  const detailsLikes = container.querySelector('.blog-likes');

  expect(div).not.toHaveStyle('display: none');
  expect(detailsUrl).toHaveTextContent('www.testing.com');
  expect(detailsLikes).toHaveTextContent('Likes: 4');
});

test('likes button should two times and fire the amount of likes of the blog', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'luciano',
    url: 'www.testing.com',
    likes: 4,
  };
  const mockHandler = vi.fn();
  const { container } = render(
    <Blog blog={blog} updateLikes={mockHandler} removeBlog={mockHandler} />
  );

  const user = userEvent.setup();
  const showDetailsButton = screen.getByText('Show details');

  await user.click(showDetailsButton);

  const detailsLikes = container.querySelector('.blog-likes-button');

  await user.click(detailsLikes);
  await user.click(detailsLikes);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test('<Blog /> should pass a snapshot testing', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'luciano',
    url: 'www.testing.com',
    likes: 4,
  };

  const mockHandler = vi.fn();

  const newBlog = render(
    <Blog blog={blog} updateLikes={mockHandler} removeBlog={mockHandler} />
  );

  expect(newBlog).toMatchSnapshot();
});
