#! /bin/bash

nohup mongod --port 30001 --replSet my-mongo-set --bind_ip_all --fork --logpath mongo.log

sleep 2

cfg="{
    _id: 'my-mongo-set',
    members: [
        {_id: 1, host: 'mongo1:30001'},
        {_id: 2, host: 'mongo2:30002'},
        {_id: 3, host: 'mongo3:30003'}
    ]
}"

mongo --port 30001 --eval "JSON.stringify(db.adminCommand({'replSetInitiate' : $cfg}))"

sleep 2

defaultData='[
  { "taskName": "default insert data", "createdOn": "2019-07-02T19:09:51.519Z" },
  { "taskName": "default insert data", "createdOn": "2019-07-02T19:09:51.519Z" },
  { "taskName": "default insert data", "createdOn": "2019-07-02T19:09:51.519Z" }
]'

mongo mongodb://mongo1:30001,mongo2:30002,mongo3:30003/test?replicaSet=my-mongo-set --eval "JSON.stringify(db.todos.insert($defaultData))"

tail -f /dev/null
