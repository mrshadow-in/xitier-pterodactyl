I appreciate you using my Xiteter template.

Please adhere to the installation instructions below:

1. Verify that the prerequisites for creating the Panel assets are present:
https://pterodactyl.io/community/customization/panel.html

2. After you've finished, swap out the existing files with those in this.ZIP !! Please notice that only the files that were altered by the theme are listed here. Therefore, you must be careful to just replace these files. Delete no files, ever!

3. Execute the following commands once the files have been successfully installed: | cd /var/www/pterodactyl | yarn add react-feather | php artisan migrate | > Yes | yarn build:production | clean php artisan

4. After the final command, the theme has to be installed. Now go to admin panel > settings > theme to alter the theme.

Change the text in this file, located at /resources/scripts/lang.tsx, to the language you wish to install: +

Run these two commands once you've completed changing the language: | cd /var/www/pterodactyl | yarn build:production

You can get in touch with us in the following Discord server if you need assistance: 

If you create a ticket, be sure to provide your username: 

