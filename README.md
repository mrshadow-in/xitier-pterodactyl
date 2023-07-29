Thank you for purchasing my Stellar template.

Please follow the steps below for installation:

1. Make sure you have the dependencies for building the Panel assets:
https://pterodactyl.io/community/customization/panel.html

2. Once you have done this, replace the files with those provided in this .ZIP
!! Please note that these are only the files that have been modified in the theme. You must therefore ensure that you only replace these files. Do NOT delete any files!

3. When the files have been successfully installed, run the following commands:
| cd /var/www/pterodactyl
| yarn add react-feather
| php artisan migrate
| > yes
| yarn build:production
| php artisan view:clear

4. The theme should be installed after the last command. You can now change the theme in admin panel > settings > theme.

+ If you want to install a different language, go to this file and change the text to your language:
> /resources/scripts/lang.tsx

When you're finished changing the language run this 2 commands:
| cd /var/www/pterodactyl
| yarn build:production

If you have any problems you can contact us in the following discord server: 

When making a ticket make sure to provide your username: 
