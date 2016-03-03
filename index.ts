#!/usr/bin/env node

// Example:
// Page URL: http://mediaservice.bibliothek.kit.edu/#/details/DIVA-2016-182/10
// Media URL: https://media.bibliothek.kit.edu/campus/2016/DIVA-2016-182_mp4.mp4

/// <reference path="typings/tsd.d.ts" />

import program = require("commander");
import childProcess = require("child_process");
import divaExpert = require("./lib/diva-expert");

program
    .version(require("./package.json").version)
    .usage("[options] <urls ...>")
    .parse(process.argv);

const mediaUrls = new Array<string>();
let counterFailed = 0;

program.args.forEach((url: string) => {
   const mediaUrl = divaExpert.getMediaUrlForPageUrl(url);
   
   if (mediaUrl === null) {
       counterFailed++;
       console.log(`Could not compute url for '${url}'`);
       return;
   }
   
   mediaUrls.push(mediaUrl); 
});

if (counterFailed > 0) {
    console.log(`${counterFailed} of ${program.args.length} urls could not be handled!`);
}
else {
    console.log("All urls could be computed! Starting downloads...");
}

childProcess.spawnSync("wget", mediaUrls, {
    stdio: ["inherit", "inherit", "inherit"]
});
