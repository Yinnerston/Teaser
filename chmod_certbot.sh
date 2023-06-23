#!/bin/bash

#use: certbot renew --post-hook /usr/local/bin/certbot-renew-fix-file-access.sh

chmod 0755 /etc/letsencrypt/
chmod 0711 /etc/letsencrypt/live/
chmod 0750 /etc/letsencrypt/live/example.com/
chmod 0711 /etc/letsencrypt/archive/
chmod 0750 /etc/letsencrypt/archive/example.com/
chmod 0640 /etc/letsencrypt/archive/example.com/{cert,chain,fullchain}*.pem
chmod 0640 /etc/letsencrypt/archive/example.com/privkey*.pem

chown root:root /etc/letsencrypt/
chown root:root /etc/letsencrypt/live/
chown root:mail /etc/letsencrypt/live/example.com/
chown root:root /etc/letsencrypt/archive/
chown root:mail /etc/letsencrypt/archive/example.com/
chown root:mail /etc/letsencrypt/archive/example.com/{cert,chain,fullchain}*.pem
chown root:mail /etc/letsencrypt/archive/example.com/privkey*.pem

/etc/init.d/postfix restart
/etc/init.d/cyrus restart
