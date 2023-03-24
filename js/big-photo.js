const COMMENT_AMOUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

let visibleComments = 0;
let comments = [];

const createComment = ({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (arr) => {
  comments = arr;
  visibleComments += COMMENT_AMOUNT;

  if (visibleComments >= comments.length) {
    commentsLoader.classList.add('hidden');
    visibleComments = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < visibleComments; i++) {
    const commentElement = createComment(comments[i]);

    fragment.append(commentElement);
  }

  commentList.innerHTML = '';
  commentList.append(fragment);
  commentCount.innerHTML = `${visibleComments} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);

  visibleComments = 0;

  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  cancelButton.removeEventListener('click', onCancselBottonClick);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

function onCancselBottonClick () {
  hideBigPicture();
}

function onCommentsLoaderClick () {
  renderComments(comments);
}

export const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);

  bigPicture.querySelector('.big-picture__img img').src = data.url;
  bigPicture.querySelector('.big-picture__img img').alt = data.description;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.social__caption').textContent = data.description;

  renderComments(data.comments);

  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  cancelButton.addEventListener('click', onCancselBottonClick);
};