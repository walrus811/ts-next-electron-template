How to sign the app
https://www.electron.build/code-signing

need to set environment variables below : 
CSC_LINK - pfx path
CSC_KEY_PASSWORD - pfx password

ex)
win32

cmd > setx CSC_LINK *.pfx 
cmd > setx CSC_KEY_PASSWORD password123

*WIN_CSC_LINK and WIN_CSC_KEY_PASSWORD are exclusive for win32