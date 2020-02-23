#!/bin/bash
_now=$(date +"%Y_%m_%d")
_file="butcher_$_now.bak"
sqlite3 ~/public_html/api/butcher.sqlite3 .dump > ~/public_html/db_backups/$_file
