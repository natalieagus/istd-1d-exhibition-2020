const fs = require('fs');
const path = require('path')

const makeTemplateFile = (detailsObj) => {
    const { title, subheadline, teamMembers = "", description, posterUrl, videoUrl } = detailsObj
    const fileContents =
        `---
layout: video
show_meta: false
title: ${title}
subheadline: ${subheadline}
tags:
    - post format
categories:
    - compstruct
iframe: <iframe src="${videoUrl}" width="320" height="240"></iframe>
related_image: ${posterUrl}
---

### Team Members

${teamMembers}  

### Description

${description}

### Poster

<iframe src="${posterUrl}" width="100%" height="480px" />
`

    fs.writeFileSync(`50.002-md/2020-10-09-${title}.md`, fileContents, "utf8")
}

const parseTextToDetails = (text) => {
    console.log(text)
}

const readInfosysFiles = (dir) => {
    fs.readdir(path.join(__dirname, dir), (err, files) => {
        if (files) {
            const detailsObj = {}
            files.forEach(file => {
                const text = fs.readFileSync(path.join(__dirname, dir, file), "utf8")

                if (path.basename(file) == 'desc.txt') {
                    const lines = text.split("\n")
                    const title = dir
                    let subheadline = ""
                    const teamMembersLines = []
                    const descriptionLines = []
                    let reachedDescription = false;

                    for (let i = 0; i < lines.length; i++) {
                        const line = lines[i].trim()
                        if (reachedDescription) {
                            descriptionLines.push(line)
                        } else {
                            if (line.includes(dir)) {
                                continue
                            } else if (line.toLowerCase().includes("team")) {
                                subheadline = line
                            }
                            else if (line.includes("100")) {
                                teamMembersLines.push(line)
                            } else if (line.toLowerCase().includes("description")) {
                                reachedDescription = true
                            }
                        }
                    }


                    const teamMembers = teamMembersLines.join("\n\n")
                    const description = descriptionLines.join("\n\n")
                    Object.assign(detailsObj, { title, teamMembers, description, subheadline })

                }

                else if (path.basename(file) == 'video.txt') {
                    const videoUrl = text.trim().replace("view", "preview")
                    Object.assign(detailsObj, { videoUrl })
                }

                else if (path.basename(file) == 'poster.txt') {
                    const posterUrl = text.trim().replace("file/d/", "uc?id=").replace("/view", "")

                    Object.assign(detailsObj, { posterUrl })
                }
            })
            console.log({ detailsObj })
            makeTemplateFile(detailsObj)
        }
    })
}

const readCompStructFiles = (dir) => {
    fs.readdir(path.join(__dirname, dir), (err, files) => {
        if (files) {
            const detailsObj = {}
            files.forEach(file => {
                const text = fs.readFileSync(path.join(__dirname, dir, file), "utf8")

                if (path.basename(file) == 'description.txt') {
                    const lines = text.split("\n")
                    let title = ""
                    let subheadline = ""
                    const teamMembersLines = []
                    const descriptionLines = []
                    let reachedTitle = false;
                    let reachedDescription = false;

                    for (let i = 0; i < lines.length; i++) {
                        const line = lines[i].trim()
                        if (reachedTitle && line.length > 0) {
                            title = line
                            reachedTitle = false
                        }

                        if (reachedDescription) {
                            descriptionLines.push(line)
                        } else {
                            if (line.toLowerCase().includes("team")) {
                                subheadline = line
                                reachedTitle = true
                            }
                            else if (line.includes("100")) {
                                teamMembersLines.push(line)
                            } else if (line.toLowerCase().includes("description")) {
                                reachedDescription = true
                            }
                        }
                    }


                    const teamMembers = teamMembersLines.join("\n\n")
                    const description = descriptionLines.join("\n\n")
                    Object.assign(detailsObj, { title, teamMembers, description, subheadline })

                }

                else if (path.basename(file) == 'video.txt') {
                    const videoUrl = text.trim().replace("view", "preview")
                    Object.assign(detailsObj, { videoUrl })
                }

                else if (path.basename(file) == 'poster.txt') {
                    const posterUrl = text.trim().replace("file/d/", "uc?id=").replace("/view", "")

                    Object.assign(detailsObj, { posterUrl })
                }
            })
            console.log({ detailsObj })
            makeTemplateFile(detailsObj)
        }
    })
}

const readTextFileInDir = {
    infoSys: readInfosysFiles,
    compStruct: readCompStructFiles
}

const readAllFiles = () => {
    fs.readdir(__dirname, (err, dirs) => {
        dirs.forEach(dir => {
            readTextFileInDir.compStruct(dir)
        });
    });
}

//test function
// readTextFileInDir.compStruct("1-1")

readAllFiles()
