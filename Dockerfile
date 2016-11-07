# A container with sources from Shared Code project "HAppi" that are built and ready to run unit tests
FROM mono:4.6.0
MAINTAINER Geohealth

# Adding NUnit to be able to run the tests
RUN nuget install NUnit.Console -Version 3.5.0 -OutputDirectory /testrunner
ENV NUGETCONSOLE /testrunner/NUnit.ConsoleRunner.3.5.0/tools/nunit3-console.exe
RUN chmod +x $NUGETCONSOLE

#-------------------------------
# Below are the 3 latests layers. The above layers will be re-used from one build to another (thanks to caching functionnalities of Docker) while the below steps will be re-executed.
#-------------------------------

# Add source code
COPY . /usr/src/sharedcode
WORKDIR /usr/src/sharedcode

# Compile source code
RUN xbuild HAppi.ClassLibrary.UnitTests/HAppi.ClassLibrary.UnitTests.csproj
