import { isEscapeKey } from './utils.js';

const COMMENT_AMOUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const shownCommentsAmount = document.querySelector('.social__comment-count');
const visibleCommentsAmount = document.querySelector('.social__comments');
const commentsCount = shownCommentsAmount.querySelector('.comments-count');
const visibleCommentsCount = shownCommentsAmount.querySelector('.visible_comments-count');
const commentsLoaderButton = document.querySelector('.comments-loader');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');

let visibleComments = 0;
let comments = [];

const createComment = ({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  const fragment = document.createDocumentFragment();
  const visibleCommentsLimit = Math.min(comments.length, visibleComments + COMMENT_AMOUNT);

  for (let i = visibleComments; i < visibleCommentsLimit; i++) {
    const commentElement = createComment(comments[i]);

    fragment.append(commentElement);
  }

  visibleComments += COMMENT_AMOUNT;
  visibleCommentsAmount.append(fragment);

  commentsCount.textContent = comments.length;
  visibleCommentsCount.textContent = visibleComments;

  if (visibleComments >= comments.length) {
    commentsLoaderButton.classList.add('hidden');
    visibleCommentsCount.textContent = comments.length;
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);

  visibleComments = 0;

  commentsLoaderButton.removeEventListener('click', onCommentsLoaderClick);
  cancelButton.removeEventListener('click', onCancelButtonClick);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
}

function onCancelButtonClick() {
  hideBigPicture();
}

function onCommentsLoaderClick() {
  renderComments();
}

export const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoaderButton.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);

  bigPictureImg.src = data.url;
  bigPictureImg.alt = data.description;
  likesCount.textContent = data.likes;
  socialCaption.textContent = data.description;

  comments = data.comments;
  visibleCommentsAmount.innerHTML = '';

  renderComments();

  commentsLoaderButton.addEventListener('click', onCommentsLoaderClick);
  cancelButton.addEventListener('click', onCancelButtonClick);
};
