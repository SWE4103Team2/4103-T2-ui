# Setup
### Make sure git is installed.
https://git-scm.com/downloads

### Text Editor
I prefer VSCode, but it doesn't really matter what you use:
https://code.visualstudio.com/

### Connect to git repo
In the git repo, above the README, there should be a green button "code"
Click that, and select https, copy the link.

Make a file on your computer you want the files stored in.
Run in cmd:
> git clone **https**

(https being the link from git)

> git pull

### NodeJs and npm (This allows you to download packages)
Get npm installed:
>https://nodejs.org/en/download/

---
Then run:
>npm install npm -g

The ' -g ' installs a package gloabally which allows you to:
  Use it across different projects by allowing...
    Use of its commands in the shell cmd. 

---
If you need a video:
https://www.youtube.com/watch?v=qYwLOXjAiwM&ab_channel=Simplilearn

### Yarn (A lot better for downloading packages -- need npm to install)
Yarn is a package manager, makes it a lot easier to manage packages.
In console run:
>npm install -g yarn

### Run yarn
In console run:
>yarn

This will download all existing packages defined in our package.json.
When pulling from master, make sure to run yarn incase new ones were added.

---
Then run:
>yarn start

'yarn start' will start the web application.