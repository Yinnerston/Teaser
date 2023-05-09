-- VirtualHost "teasernsfw.com"
https_ports = {  }

VirtualHost "wocchit.com"
    ssl = {
        key = "/etc/letsencrypt/live/wocchit.com/privkey.pem";
        certificate = "/etc/letsencrypt/live/wocchit.com/cert.pem";
        -- https_certificate = “/etc/prosody/certs/wocchit.com.crt”;
        -- https_key = “/etc/prosody/certs/wocchit.com.key”;
    }
    -- TODO: https://prosody.im/doc/letsencrypt
    c2s_interfaces = { "192.168.0.1", "::1", "wocchit.com" }
    c2s_require_encryption = true

    admins = { "teaseradmin@teasernsfw.com" }
    plugin_paths = { "/usr/lib/prosody/prosody-modules-enabled"}
    modules_enabled = {

        -- Generally required
            "disco"; -- Service discovery
            "roster"; -- Allow users to have a roster. Recommended ;)
            "saslauth"; -- Authentication for clients and servers. Recommended if you want to log in.
            "tls"; -- Add support for secure TLS on c2s/s2s connections

        -- Not essential, but recommended
            "blocklist"; -- Allow users to block communications with other users
            "bookmarks"; -- Synchronise the list of open rooms between clients
            "carbons"; -- Keep multiple online clients in sync
            "dialback"; -- Support for verifying remote servers using DNS
            "limits"; -- Enable bandwidth limiting for XMPP connections
            "pep"; -- Allow users to store public and private data in their account
            "private"; -- Legacy account storage mechanism (XEP-0049)
            "smacks"; -- Stream management and resumption (XEP-0198)
            "vcard4"; -- User profiles (stored in PEP)
            "vcard_legacy"; -- Conversion between legacy vCard and PEP Avatar, vcard

        -- Nice to have
            "csi_simple"; -- Simple but effective traffic optimizations for mobile devices
            "invites"; -- Create and manage invites
            -- "invites_adhoc"; -- Allow admins/users to create invitations via their client
            -- "invites_register"; -- Allows invited users to create accounts
            "ping"; -- Replies to XMPP pings with pongs
            "register"; -- Allow users to register on this server using a client and change passwords
            "time"; -- Let others know the time here on this server
            "uptime"; -- Report how long server has been running
            "version"; -- Replies to server version requests
            --"mam"; -- Store recent messages to allow multi-device synchronization
            --"turn_external"; -- Provide external STUN/TURN service for e.g. audio/video calls

        -- Admin interfaces
            "admin_adhoc"; -- Allows administration via an XMPP client that supports ad-hoc commands
            -- "admin_shell"; -- Allow secure administration via 'prosodyctl shell'

        -- HTTP modules
            --"bosh"; -- Enable BOSH clients, aka "Jabber over HTTP"
            --"http_openmetrics"; -- for exposing metrics to stats collectors
            --"websocket"; -- XMPP over WebSockets

        -- Other specific functionality
            --"announce"; -- Send announcement to all online users
            --"groups"; -- Shared roster support
            --"legacyauth"; -- Legacy authentication. Only used by some old clients and bots.
            --"mimicking"; -- Prevent address spoofing
            --"motd"; -- Send a message to users when they log in
            --"proxy65"; -- Enables a file transfer proxy service which clients behind NAT can use
            --"s2s_bidi"; -- Bi-directional server-to-server (XEP-0288)
            --"server_contact_info"; -- Publish contact information for this service
            --"tombstones"; -- Prevent registration of deleted accounts
            --"watchregistrations"; -- Alert admins of registrations
            --"welcome"; -- Welcome users who register accounts
        -- converse.js
            "conversejs";
    }
