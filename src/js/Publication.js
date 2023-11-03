import TextPost from './TextPost';
import Validator from './Validator';

export default class Publication {
  constructor(root) {
    this.root = root;
    this.container = document.querySelector('.container');
    this.input = document.querySelector('.input');
    this.modal = document.querySelector('.modal');
    this.modalInput = document.querySelector('.modal-input');
  }

  init() {
    document.addEventListener('submit', (e) => {
      this.getCurrentPosition(e);
      this.validate(e);
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.cancel-btn')) return;
      this.closeModal();
    });
  }

  getCurrentPosition(e) {
    e.preventDefault();

    if (!e.target.closest('.input-container')) return;
    if (this.input.value.trim() === '') {
      this.input.placeholder = 'Напишите что-нибудь';
      return;
    }

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (data) => this.handleData(data),
      () => this.handleError(),
      { timeout: 10000, enableHighAccuracy: true, maximumAge: 0 },
    );
  }

  handleData(data) {
    this.render(data.coords);
    this.input.placeholder = '';
  }

  handleError() {
    this.modal.classList.remove('hidden');
    this.modalInput.focus();
  }

  validate(e) {
    e.preventDefault();
    if (!e.target.closest('.modal-form')) return;

    const { value } = this.modalInput;
    const description = document.querySelector('.description');

    const data = Validator.check(value);

    if (data) {
      this.render(data);
      this.closeModal();
    } else {
      description.style.color = 'red';
    }

    this.modalInput.oninput = () => {
      description.style.color = 'black';
    };
  }

  closeModal() {
    this.modal.classList.add('hidden');
    this.modalInput.value = '';
  }

  render(data) {
    const { latitude, longitude } = data;
    const geo = `[${latitude}, ${longitude}]`;

    const post = TextPost.create(this.input.value, geo);
    this.addElements(post);
    this.input.value = '';
  }

  addElements(post) {
    const newEl = document.createElement('div');
    newEl.classList.add('post');

    const contentEl = document.createElement('div');
    const timeEl = document.createElement('div');
    const geoEl = document.createElement('div');

    newEl.appendChild(contentEl);
    newEl.appendChild(timeEl);
    newEl.appendChild(geoEl);

    contentEl.className = 'content';
    timeEl.className = 'time';
    geoEl.className = 'geo';

    contentEl.textContent = post.content;
    timeEl.textContent = post.time;
    geoEl.textContent = post.geo;

    this.container.append(newEl);
  }
}
