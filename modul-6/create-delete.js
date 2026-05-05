function tambahTugasManual(teks) {
  const li = document.createElement("li");
  li.textContent = teks; 
  li.className = "item-tugas";
  const btnHapus = document.createElement("button");
  btnHapus.textContent = "✕";
  btnHapus.className = "btn-hapus";
  btnHapus.addEventListener("click", () => li.remove());
  li.appendChild(btnHapus);
  document.getElementById("list-tugas").appendChild(li);
}
function tambahTugasHTML(teks) {
  const teksAman = teks.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  document.getElementById("list-tugas").insertAdjacentHTML(
    "beforeend",
    `
<li class="item-tugas">
${teksAman}
<button class="btn-hapus" onclick="this.parentElement.remove()">✕</button>
</li>
`,
  );
}
const inputTugas = document.getElementById("input-tugas");
const btnTambah = document.getElementById("btn-tambah");
const btnHapusSemua = document.getElementById("btn-hapus-semua");
btnTambah.addEventListener("click", () => {
  const teks = inputTugas.value.trim();
  if (!teks) {
    inputTugas.focus();
    return;
  }
  tambahTugasManual(teks);
  inputTugas.value = ""; 
  inputTugas.focus(); 
});

inputTugas.addEventListener("keydown", (e) => {
  if (e.key === "Enter") btnTambah.click();
});

btnHapusSemua.addEventListener("click", () => {
  const list = document.getElementById("list-tugas");
  list.innerHTML = ""; 
});
