# Hakuraku

A web tool for [ウマ娘プリティーダービー](https://umamusume.jp/).

## Build, Run & Deploy

### Update proto

After editing `umdb/data.proto`, one should run `umdb/compile_proto.sh` to update the generated code.

The generated code should be checked in to the repository.

### Generate `umdb.binarypb`

Run `umdb/generate_db.py --db_path <path_to_master.mdb> --version <version_string>` to generate an
updated `umdb.binarypb` from `master.mdb`.

The generated file should be checked in to the repository (under `public/data`).

### Local run

`yarn start` runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the
browser.

### Prod build

`yarn build` builds the app for production to the `build` folder. It correctly bundles React in production mode and
optimizes the build for the best performance.

## RaceDataParser

Hakuraku has a built-in parser for `race_scenario` data found in the packets.

If your packets are captured by [Riru-CarrotJuicer](https://github.com/CNA-Bld/Riru-CarrotJuicer)
or [EXNOA-CarrotJuicer](https://github.com/CNA-Bld/EXNOA-CarrotJuicer), you can use
the [CarrotJuicer page](https://hakuraku.sshz.org/#/carrotjuicer) to investigate the contents of the packets. If the
packet contains a single mode race, or a group of team races, it will attempt to parse it automatically and show some
(hopefully) useful visualizations.

If you would like to investigate daily races, or if you are using other tools to collect the packets, you can manually
paste the required fields into the RaceDataParser page.

The implementation of the parser is [here](src/data/RaceDataParser.ts). However, if you wish to write scripts / do your
own analysis, you may wish to use [the Python version](umdb/race_data_parser.py) instead.

### Details

The `race_scenario` field is the `base64(gzip())` of a manually implemented binary serialization format. The logic to
deserialize it can be found in `RaceSimulateData.Deserialize`.

[This protobuf file](umdb/race_data.proto) roughly resembles the same info, except that unknown regions (in header, and
immediately after each `__padding_size`) are currently dropped.
