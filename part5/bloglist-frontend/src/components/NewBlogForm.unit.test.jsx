import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewBlogForm from './NewBlogForm';
import { input } from '@testing-library/user-event/dist/cjs/event/input.js';

test.only('<NewBlogForm /> updates parent state and calls onSubmit', async () => {
  const submitBlog = vi.fn();
  const user = userEvent.setup();

  render(<NewBlogForm handleSubmit={submitBlog} />);

  const titleInput = screen.getByPlaceholderText('add a blog title here');
  const authorInput = screen.getByPlaceholderText('add a blog author here');
  const urlInput = screen.getByPlaceholderText('add a blog url here');

  const sendButton = screen.getByText('create');

  await user.type(titleInput, 'testing a form... title');
  await user.type(authorInput, 'testing the author');
  await user.type(urlInput, 'testingurl.com');

  await user.click(sendButton);

  expect(submitBlog.mock.calls).toHaveLength(1);
  expect(submitBlog.mock.calls[0][0]).toBe('testing a form... title');
  expect(submitBlog.mock.calls[0][1]).toBe('testing the author');
  expect(submitBlog.mock.calls[0][2]).toBe('testingurl.com');
});
