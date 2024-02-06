BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Vehicle" (
	"id"	INTEGER NOT NULL UNIQUE,
	"veh_make"	TEXT NOT NULL,
	"veh_model"	TEXT NOT NULL,
	"veh_year"	INTEGER NOT NULL,
	"added_to_fleet"	INTEGER NOT NULL,
	"original_mileage"	INTEGER NOT NULL,
	"total_mileage"	INTEGER,
	"mileage_since_oc"	INTEGER,
	"oil_change_needed"	REAL NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Occupants" (
	"id"	INTEGER NOT NULL UNIQUE,
	"firstname"	TEXT NOT NULL,
	"lastname"	TEXT NOT NULL,
	"middlename"	TEXT,
	"dob"	INTEGER NOT NULL,
	"driver_lic_num"	TEXT NOT NULL,
	"street_address"	TEXT,
	"city"	TEXT,
	"state"	TEXT,
	"zip"	INTEGER,
	"trips_as_driver"	INTEGER,
	"trips_as_pass"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Trips" (
	"id"	INTEGER NOT NULL,
	"vehicle_used"	INTEGER NOT NULL,
	"driver"	INTEGER NOT NULL,
	"passenger"	INTEGER,
	"starting_mileage"	INTEGER NOT NULL,
	"ending_mileage"	INTEGER NOT NULL,
	"veh_cond_start"	TEXT NOT NULL,
	"veh_cond_end"	TEXT NOT NULL,
	"date_start"	INTEGER NOT NULL,
	"date_end"	INTEGER NOT NULL,
	"time_start"	INTEGER NOT NULL,
	"time_end"	INTEGER NOT NULL,
	"fuel_begin"	INTEGER NOT NULL,
	"fuel_end"	INTEGER NOT NULL,
	"destination_zip"	INTEGER NOT NULL,
	"issues_this_trip"	TEXT,
	"reason_for_trip"	TEXT NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("driver") REFERENCES "Occupants"("id"),
	FOREIGN KEY("vehicle_used") REFERENCES "Vehicle"("id")
);
INSERT INTO "Vehicle" VALUES (1,'Chevrolet','Malibu',2010,1282024,134888,134888,NULL,'');
INSERT INTO "Vehicle" VALUES (2,'Lincoln','Town Car',2006,1282024,85462,85462,NULL,'');
INSERT INTO "Vehicle" VALUES (3,'Mercury','Grand Marquir',1998,1282024,167822,167822,NULL,'');
INSERT INTO "Vehicle" VALUES (4,'Ford','Contour SVT',1988,1282024,135321,135321,NULL,'');
INSERT INTO "Occupants" VALUES (1,'John','Adams','Quincy',1012000,'p123456789123','123 Main','Tacoma','WA',45632,NULL,NULL);
INSERT INTO "Occupants" VALUES (2,'Terrell','Owens','',10119900,'a654654654654','321 Main','Tacoma','WA',45632,NULL,NULL);
INSERT INTO "Occupants" VALUES (3,'George','Washington','Carver',7041776,'w789456123456','1600 Pennsylvania','Roanoke','VA',98745,NULL,NULL);
INSERT INTO "Trips" VALUES (1,1,1,2,134888,134912,'good','good',1282024,1282024,120000,173000,99,50,49770,'none','joyride');
COMMIT;
