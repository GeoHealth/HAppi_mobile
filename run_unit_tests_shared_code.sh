#!/bin/bash

docker run geohealth/happi /bin/bash -c "mono $NUGETCONSOLE HAppi.ClassLibrary.UnitTests/bin/Debug/HAppi.ClassLibrary.UnitTests.dll"