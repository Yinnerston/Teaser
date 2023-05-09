FROM prosody/prosody
RUN apt-get update && apt-get install -y apt-transport-https
RUN apt-get install mercurial -y
# RUN rm -rf /usr/lib/prosody/prosody-modules
RUN if test -e  /usr/lib/prosody/prosody-modules ; then echo ALREADY CLONED ; else hg clone https://hg.prosody.im/prosody-modules/ /usr/lib/prosody/prosody-modules ; fi;
# RUN cd /usr/lib/prosody/prosody-modules-enabled
RUN mkdir /usr/lib/prosody/prosody-modules-enabled; exit 0

# TODO: Symlink all the modules you want
# WORKDIR /usr/lib/prosody/prosody-modules-enabled
# RUN ln -s /usr/lib/prosody/prosody-modules/mod_conversejs
# RUN ln -s /usr/lib/prosody/prosody-modules/mod_invites
# RUN ln -s /usr/lib/prosody/prosody-modules/mod_smacks
# RUN cd /usr/lib/prosody/prosody-modules-enabled && ln -s /usr/lib/prosody/prosody-modules/mod_conversejs; exit 0
RUN cd /usr/lib/prosody/modules && ln -s /usr/lib/prosody/prosody-modules/mod_conversejs; exit 0

# RUN cd /usr/lib/prosody/prosody-modules-enabled && ln -s /usr/lib/prosody/prosody-modules/mod_invites; exit 0
RUN cd /usr/lib/prosody/modules && ln -s /usr/lib/prosody/prosody-modules/mod_invites; exit 0

# RUN cd /usr/lib/prosody/prosody-modules-enabled && ln -s /usr/lib/prosody/prosody-modules/mod_smacks; exit 0
RUN cd /usr/lib/prosody/modules && ln -s /usr/lib/prosody/prosody-modules/mod_smacks; exit 0
