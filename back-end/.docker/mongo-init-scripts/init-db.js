db = db.getSiblingDB("notedb");
db.createUser({
  user: "root",
  pwd: "strongrootpassword",
  roles: [{ role: "readWrite", db: "notedb" }],
});
