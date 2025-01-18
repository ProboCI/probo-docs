FROM ubuntu:18.04

# Set our our meta data for this container.
LABEL name="FlyingFlip Studios, LLC. Platform Docker Container"
LABEL author="Michael R. Bagnall <michael@bagnall.io>"

WORKDIR /root

ENV TERM=xterm

ENV PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/share
RUN apt-get update && apt-get -y upgrade

RUN DEBIAN_FRONTEND=noninteractive apt-get -y install curl dirmngr apt-transport-https lsb-release ca-certificates sudo apt-utils wget rubygems build-essential autoconf libtool pkg-config python-opengl python-pil python-pyrex python-pyside.qtopengl idle-python2.7 qt4-dev-tools qt4-designer libqtgui4 libqtcore4 libqt4-xml libqt4-test libqt4-script libqt4-network libqt4-dbus python-qt4 python-qt4-gl libgle3 python-dev

# Update apt repos and install base apt packages.
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  gem uninstall bundler && \
  apt-get update && apt-get -y upgrade && DEBIAN_FRONTEND=noninteractive apt-get install -y \
  software-properties-common imagemagick apache2 apache2-utils make zlib1g libxml2-dev libxml2 && \
  apt-add-repository -y ppa:brightbox/ruby-ng && \
  apt-get -y update && \
  apt-get install -y ruby2.7 ruby2.7-dev && \
  update-alternatives --config ruby && \
  gem install bundler -v 2.1.4 && \
  gem install json -v '2.5.1' && \
  gem install nokogiri -v '1.12.1'

RUN mkdir -p /src
COPY . /src
WORKDIR /src

RUN bundle install --path vendor/bundle && \
  LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8 LANGUAGE=en_US.UTF-8 bundle exec jekyll build --destination=/var/www/html

# Configure Apache. Be sure to enable apache mods or you're going to have a bad time.
RUN a2enmod rewrite \
  && a2enmod actions \
  && a2enmod alias \
  && a2enmod deflate \
  && a2enmod dir \
  && a2enmod expires \
  && a2enmod headers \
  && a2enmod mime \
  && a2enmod negotiation \
  && a2enmod setenvif \
  && a2enmod proxy \
  && a2enmod proxy_http \
  && a2enmod speling \
  && a2enmod cgid \
  && a2enmod remoteip \
  && a2enmod ssl && \
  service apache2 restart

WORKDIR /root

RUN touch file.txt

RUN service apache2 start

CMD [ "tail", "-f", "/root/file.txt" ]