!define Company "company"
!define AppName "app name"
!define AppExeName "app name.exe"
!define AppUninstaller "Uninstall app name.exe"

!macro preInit 
    SetRegView 64
    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$ProgramFiles64\${Company}\${AppName}"
    WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$ProgramFiles64\${Company}\${AppName}"
    SetRegView 32
    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$ProgramFiles\${Company}\${AppName}"
    WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$ProgramFiles\${Company}\${AppName}"
!macroend

!macro customInstall 
    CreateDirectory '$SMPROGRAMS\${Company}' 
    CreateShortCut '$SMPROGRAMS\${Company}\${AppName}.lnk' '$INSTDIR\${AppExeName}'
    CreateDirectory '$LOCALAPPDATA\${Company}\${AppName}\program'
    ; comment - CopyFiles '$INSTDIR\program\abc.exe' '$LOCALAPPDATA\${Company}\${AppName}\program'
!macroend

!macro customUnInstall  
    Delete '$SMPROGRAMS\${Company}\${AppName}.lnk'
!macroend
