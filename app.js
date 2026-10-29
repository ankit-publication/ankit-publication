
const notes = [
  {
    title: "MEG-02 Solved Assignment 2026-27 (FREE PDF Download)",
    subject: "MAEG",
    code: "MEG-02",
    description:
      "Literary Criticism & Theory assignment for July 2026 and January 2027 sessions.",
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg0IALHMvHmFQBerrOuE4mYMaVaJr3brKCCt5qMTFz6D8hOXlxcihttAx_byGHaoI9W3p9bzu8yxoTCisPYYBLxeczSH5CunV6GliJsERAGUZpBt_Ovdlzxa8WxHwz0OCGCZK0PCZnJhBxRsiUQ7MFhVYSA9haT0xZ_PYvaVeSzPP6-2lx7L7F3Aw-wuDJ5/s1600/MEG-2.webp",
    pdf: "",
    page: "post-meg-02.html"
  },
  {
    title: "Business Communication",
    subject: "BCOM",
    code: "BCOM-101",
    description: "Study material for commerce students.",
    image: "",
    pdf: ""
  },
  {
    title: "Management Studies",
    subject: "MBA",
    code: "MBA-101",
    description: "Management concepts and revision notes.",
    image: "",
    pdf: ""
  },
  {
    title: "English Literature",
    subject: "BA",
    code: "BA-101",
    description: "Literature notes for undergraduate students.",
    image: "",
    pdf: ""
  }
];

let selectedSubject = "All";

const notesContainer = document.getElementById("notes");
const subjectsContainer = document.getElementById("subjects");
const searchInput = document.getElementById("search");

const subjects = ["All", ...new Set(notes.map(n => n.subject))];

// Create subject filter buttons
subjects.forEach(subjectName => {
  const button = document.createElement("button");
  button.className = "subject";
  button.textContent = subjectName;

  button.addEventListener("click", () => {
    selectedSubject = subjectName;
    renderNotes();
  });

  subjectsContainer.appendChild(button);
});

function renderNotes() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = notes.filter(note => {
    const matchesSubject =
      selectedSubject === "All" ||
      note.subject === selectedSubject;

    const matchesSearch = [
      note.title,
      note.subject,
      note.code,
      note.description
    ].some(value => value.toLowerCase().includes(query));

    return matchesSubject && matchesSearch;
  });

  notesContainer.replaceChildren();

  if (filtered.length === 0) {
    notesContainer.textContent = "No notes found.";
    return;
  }

  filtered.forEach(note => {
    const card = document.createElement("article");
    card.className = "card";

    // Clickable thumbnail
    if (note.image) {
      const thumbnail = document.createElement("img");
      thumbnail.className = "note-thumbnail";
      thumbnail.src = note.image;
      thumbnail.alt = note.title;
      thumbnail.loading = "lazy";

      if (note.page) {
        const imageLink = document.createElement("a");
        imageLink.className = "note-image-link";
        imageLink.href = note.page;
        imageLink.setAttribute("aria-label", "View " + note.title);

        imageLink.appendChild(thumbnail);
        card.appendChild(imageLink);
      } else {
        card.appendChild(thumbnail);
      }
    }

    // Title: keep the heading INSIDE the link
    const title = document.createElement("h3");
    title.textContent = note.title;

    if (note.page) {
      const titleLink = document.createElement("a");
      titleLink.className = "note-title-link";
      titleLink.href = note.page;

      titleLink.appendChild(title);
      card.appendChild(titleLink);
    } else {
      card.appendChild(title);
    }

    // Subject and course code
    const subject = document.createElement("p");
    subject.textContent = `${note.subject} · ${note.code}`;

    // Description
    const description = document.createElement("p");
    description.textContent = note.description;

    // Action buttons
    const actions = document.createElement("div");
    actions.className = "actions";

    if (note.page) {
      const view = document.createElement("a");
      view.href = note.page;
      view.textContent = "View Post";
      actions.appendChild(view);
    } else if (note.pdf) {
      const read = document.createElement("a");
      read.href = note.pdf;
      read.target = "_blank";
      read.rel = "noopener";
      read.textContent = "Read PDF";

      const download = document.createElement("a");
      download.href = note.pdf;
      download.download = "";
      download.textContent = "Download";

      actions.append(read, download);
    } else {
      const message = document.createElement("p");
      message.textContent = "PDF link not added yet.";
      actions.appendChild(message);
    }

    // Append each element only once
    card.append(subject, description, actions);
    notesContainer.appendChild(card);
  });
}

// Search notes as the user types
searchInput.addEventListener("input", renderNotes);

// Display notes when the page loads
renderNotes();
