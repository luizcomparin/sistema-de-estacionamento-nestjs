This is how data flows in this application:

INCOMING REQUEST (data/body)
-> dto (expected request data mold)
-> controller (passes data through middleware and redirects to service)
-> middleware (verifies if data conforms with expectations)
-> service (applies business rules to data, then redirects to repository)
-> repository (does database manipulation and save, update, get or delete data)
-> entity (represents the mold of the database table)
-> database (actual data being retrieved or modified)
