# Web-Technologien (WEBT)
Code samples created during the WEBT module at HSLU.

© Joël Ammann


## Webserver Configuration
Ubuntu 22.04.4 LTS on WSL2

### Install Apache2
```bash
sudo apt update
sudo apt upgrade

sudo apt -y install apache2

ss -pantue

```
#### Configure Apache2 vhost
```bash
cd /etc/apache2/sites-available

cp 000-default.conf webt-dev.conf
vim webt-dev.conf

sudo a2ensite webt-dev.conf

sudo systemctl reload apache2

tail -f /var/log/apache2/access.log
```

### Install mariadb
```bash
sudo apt -y install mariadb-client mariadb-server
apt list --installed | grep maria

sudo mysql_secure_installation
```

### Install PHP and extensions
```bash
sudo apt -y php php-common libapache2-mod-php php-curl php-imagick php-json php-mbstring php-mysql

apt list --installed | grep php
```

### Install PhpMyAdmin
```bash
sudo apt -y phpmyadmin
```

### Enable Apache2 mod_rewrite
```bash
sudo a2enmod rewrite
```