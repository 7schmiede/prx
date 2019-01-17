# overwrites settings in following order:

1. ./AppData/@fen89/prx/ prx.config.json (prx source folder)
2. ./AppData/@fen89/prx/ prx.company.json (optional, remote?)
3. ./AppData/@fen89/prx/ prx.user.json (optional, for any machine, remote?)
4. ./AppData/@fen89/prx/ prx.local.json (optional, for local machine)
5. ./**/prx.json (optional, per project)
6. ...

merge result as IPrxConfig 

