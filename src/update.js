const path = require("path");
const fetch = require("node-fetch");
const fs = require("fs");

let stars = 0,
  page = 1;

let special;

const CountStars = async () => {
  let StarsData = await fetch(
    `https://api.github.com/users/Bill716/starred?per_page=100&page=${page}`
  ).then((res) => res.json());
  stars += StarsData.length;
  page++;
  if (StarsData.length === 100) CountStars();
  else WriteReadMe();
};

const WriteReadMe = async () => {
  //Get ReadMe path
  const ReadMe = path.join(__dirname, "..", "README.md");
  const date = new Date();
  
  //Season Based Emoji
  let dd = date.getDate(), mm = date.getMonth() + 1
  
  if(mm === 12)special = ["⛄", "❄", "🎄"]

  //Fetching Info From Github API
  let UserData = await fetch("https://api.github.com/users/Bill716").then(
    (res) => res.json()
  );

  //Creating the text what we gonna save on ReadMe file
  const text = `## Hi there 👋 <img align="right" style="border: 2px solid red; border-radius: 12px;" src="https://media.discordapp.net/attachments/836279726003322991/870031250516217866/abdala.png?width=712&height=702" width="180" />
  I'm **Bill716**, An developer from somewhere in the earth. I like to code web applications and games. I have worked on many projects in my past. Thanks for visiting my github profile. Have a great day ahead!~
  
  <h2 align="center">✨ About Me ✨</h2>
  
  \`\`\`js
  const Bill716 = {
      FavouriteLanguage: "Javascript/Typescript",
      OpenedIssues: 76,
      OpenedPullRequests: 54,
      TotalCommits: 5496,
      Stars: 1536,
      Repositories: {
         Created: 76,
         Contributed: 50
      },
  }; //I'm a Epic Object, UwU
  \`\`\`
  
  <h2 align="center">💬 Contact Me 💬</h2>
  
  [![Discord Presence](https://lanyard.cnrad.dev/api/640512148786642947)](https://discord.com/users/640512148786642947)
  
  <details>
      <summary>
          Support me
      </summary>
      <br />
      <a href="https://ko-fi.com/bill_hub" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png" alt="Buy Me A Coffee" width="150" ></a>
  </details>
  
  <h2 align="center">🚀 My Stats 🚀</h2>
  <p align="center">
      <img src="https://github-readme-streak-stats.herokuapp.com/?user=SudhanPlayz&theme=tokyonight" />
  </p>
  <details>
      <summary>
          Even more stats
      </summary>
      <br />
      <p align="center">
          <img src="https://github-profile-trophy.vercel.app/?username=SudhanPlayz&theme=dracula" />
      </p>
      <p align="center">
          <img src="https://github-readme-stats.vercel.app/api?username=Bill716&theme=tokyonight&count_private=true&show_icons=true&include_all_commits=true" />
      </p>
      <p align="center">
          <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=stuyy&layout=compact&theme=dark" />
      </p>
  </details>
  
<!-- Last updated on ${date.toString()} ;-;-->
<i>Last updated on ${date.getDate()}${
    date.getDate() === 1
      ? "st"
      : date.getDate() === 2
      ? "nd"
      : date.getDate() === 3
      ? "rd"
      : "th"
  } ${
    [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][date.getMonth()]
  } ${date.getFullYear()} using magic</i> ${special?special[2]:"✨"}`;

  //Saving on readme.md
  fs.writeFileSync(ReadMe, text);
};

(() => {
    CountStars();
})()
