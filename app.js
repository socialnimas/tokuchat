// Firebase設定（あなたのFirebaseの設定に書き換えてください）
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 年齢確認処理
const ageCheck = document.getElementById('age-check');
const board = document.getElementById('board');

if (localStorage.getItem("isAdult") === "true") {
  ageCheck.classList.add("hidden");
  board.classList.remove("hidden");
} else {
  document.getElementById("yes").onclick = () => {
    localStorage.setItem("isAdult", "true");
    ageCheck.classList.add("hidden");
    board.classList.remove("hidden");
  };
  document.getElementById("no").onclick = () => {
    document.querySelector(".modal").innerHTML = "<p>ご利用いただけません。</p>";
  };
}

// 投稿処理
document.getElementById("post-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const message = document.getElementById("message").value.trim();
  if (!message) return;

  db.collection("messages").add({
    text: message,
    created: firebase.firestore.FieldValue.serverTimestamp()
  });
  document.getElementById("message").value = "";
});

// リアルタイム表示
db.collection("messages")
  .orderBy("created", "asc")
  .limit(50)
  .onSnapshot(snapshot => {
    const list = document.getElementById("messages");
    list.innerHTML = "";
    snapshot.forEach(doc => {
      const li = document.createElement("li");
      li.textContent = `匿名さん: ${doc.data().text}`;
      list.appendChild(li);
    });
  });

