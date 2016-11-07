FROM ubuntu:16.04

MAINTAINER Geohealth

RUN apt-get update && \
    apt-get install mono-xbuild -y && \
    apt-get autoremove -y && \
    apt-get clean

ENTRYPOINT ["xbuild"]
