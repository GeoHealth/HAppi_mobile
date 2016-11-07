FROM didstopia/msbuild
MAINTAINER Geohealth

# Adding NUnit to be able to run the tests
RUN nuget install NUnit.Runners -Version 3.5.0 -OutputDirectory /testrunner
ENV NUGETCONSOLE /testrunner/NUnit.ConsoleRunner.3.5.0/tools/nunit3-console.exe
RUN chmod +x $NUGETCONSOLE

COPY . /usr/src/sharedcode
WORKDIR /usr/src/sharedcode

# Build "only" the Shared Code folder. Xamarin is needed for the other ones.
CMD xbuild HAppi.ClassLibrary.UnitTests/HAppi.ClassLibrary.UnitTests.csproj
