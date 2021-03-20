import argparse
import sqlite3

import data_pb2


def open_db(path: str) -> sqlite3.Cursor:
    connection = sqlite3.connect(path)
    return connection.cursor()


def populate_charas(pb: data_pb2.UMDatabase, cursor: sqlite3.Cursor):
    cursor.execute("SELECT `index`, text FROM text_data WHERE category=170;")
    rows = cursor.fetchall()
    for row in rows:
        c = data_pb2.Chara()
        c.id = row[0]
        c.name = row[1]
        pb.chara.append(c)


def populate_succession_relation(pb: data_pb2.UMDatabase, cursor: sqlite3.Cursor):
    relations = {}

    cursor.execute("SELECT relation_type, relation_point FROM succession_relation;")
    rows = cursor.fetchall()
    for row in rows:
        r = data_pb2.SuccessionRelation()
        r.relation_type = row[0]
        r.relation_point = row[1]
        relations[r.relation_type] = r

    cursor.execute("SELECT relation_type, chara_id FROM succession_relation_member;")
    rows = cursor.fetchall()
    for row in rows:
        relations[row[0]].member_chara_id.append(row[1])

    pb.succession_relation.extend(relations.values())


def populate_race_instance(pb: data_pb2.UMDatabase, cursor: sqlite3.Cursor):
    cursor.execute("SELECT `index`, text FROM text_data WHERE category=29;")
    rows = cursor.fetchall()
    for row in rows:
        r = data_pb2.RaceInstance()
        r.id = row[0]
        r.name = row[1]
        pb.race_instance.append(r)


def populate_wins_saddle(pb: data_pb2.UMDatabase, cursor: sqlite3.Cursor):
    instance_id_columns = ', '.join(['single_mode_wins_saddle.race_instance_id_%d' % i for i in range(1, 9)])
    cursor.execute('''SELECT single_mode_wins_saddle.id, t.text, %s
                      FROM single_mode_wins_saddle
                      JOIN text_data AS t
                      ON t.category=111 AND single_mode_wins_saddle.id = t."index"''' % instance_id_columns)
    rows = cursor.fetchall()
    for row in rows:
        w = data_pb2.WinsSaddle()
        w.id = row[0]
        w.name = row[1]
        w.race_instance_id.extend([i for i in row[2:] if i > 0])
        pb.wins_saddle.append(w)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--db_path", default="master.mdb")
    parser.add_argument("--version", default="test")
    args = parser.parse_args()

    pb = data_pb2.UMDatabase()
    pb.version = args.version

    cursor = open_db(args.db_path)

    populate_charas(pb, cursor)
    populate_succession_relation(pb, cursor)
    populate_race_instance(pb, cursor)
    populate_wins_saddle(pb, cursor)

    print(pb)

    with open('../public/data/umdb.binaryproto', 'wb') as f:
        f.write(pb.SerializeToString())


if __name__ == '__main__':
    main()
