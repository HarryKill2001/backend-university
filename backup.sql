CREATE TABLE public.people (
	id serial NOT NULL,
	name varchar NOT NULL,
	email varchar NOT NULL,
    CONSTRAINT people_pkey PRIMARY KEY (id)
);