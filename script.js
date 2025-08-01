function addPost() {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();
  if (message === "") return;

  const forum = document.getElementById("forum");

  const post = {
    author: "Anonymous",
    message,
    date: new Date().toLocaleString()
  };

  // Zapisz w localStorage
  const existing = JSON.parse(localStorage.getItem("posts") || "[]");
  existing.unshift(post); // nowa wiadomość na górze
  localStorage.setItem("posts", JSON.stringify(existing));

  input.value = "";
  renderPosts();
}

function renderPosts() {
  const forum = document.getElementById("forum");
  forum.innerHTML = "";

  const posts = JSON.parse(localStorage.getItem("posts") || "[]");

  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <div class="author">${post.author}</div>
      <div class="date">${post.date}</div>
      <div class="message">${escapeHTML(post.message)}</div>
    `;
    forum.appendChild(div);
  });
}

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Załaduj wiadomości przy starcie
renderPosts();
function sendChat() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  if (message === "") return;

  const chat = document.getElementById("chatMessages");

  const div = document.createElement("div");
  div.className = "msg";
  div.textContent = `Anonymous: ${message}`;
  chat.appendChild(div);

  // Przewiń na dół
  chat.scrollTop = chat.scrollHeight;

  input.value = "";
}
