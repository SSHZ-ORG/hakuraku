# Hakuraku

A web tool for [ウマ娘プリティーダービー](https://umamusume.jp/).

## Build, Run & Deploy

### Update proto

After editing `umdb/data.proto`, one should run `umdb/compile_proto.sh` to update the generated code.

The generated code should be checked in to the repository.

### Generate `umdb.binaryproto`

Run `umdb/generate_db.py --db_path <path_to_master.mdb> --version <version_string>` to generate an
updated `umdb.binaryproto` from `master.mdb`.

The generated file should be checked in to the repository (under `public/data`).

Hopefully useful command:
`adb shell 'su -c cp /data/data/jp.co.cygames.umamusume/files/master/master.mdb /sdcard/' && adb pull /sdcard/master.mdb`

### Local run

`yarn start` runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the
browser.

### Prod build

`yarn build` builds the app for production to the `build` folder. It correctly bundles React in production mode and
optimizes the build for the best performance.
