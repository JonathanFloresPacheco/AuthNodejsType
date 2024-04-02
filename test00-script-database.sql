-- Database: test00

-- DROP DATABASE IF EXISTS test00;

CREATE DATABASE test00
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Mexico.1252'
    LC_CTYPE = 'Spanish_Mexico.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;
	


-- FUNCTION: public.get_all_users()

-- DROP FUNCTION IF EXISTS public.get_all_users();

CREATE OR REPLACE FUNCTION public.get_all_users(
	)
    RETURNS TABLE(id integer, name character varying, email character varying, created_at timestamp with time zone, updated_at timestamp with time zone) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$

BEGIN
  RETURN QUERY
    SELECT u.id, u."name", u.email, u.created_at, u.updated_at
    FROM public.users as  u;
END;
$BODY$;

ALTER FUNCTION public.get_all_users()
    OWNER TO postgres;


-- FUNCTION: public.get_user_by_email(text)

-- DROP FUNCTION IF EXISTS public.get_user_by_email(text);

CREATE OR REPLACE FUNCTION public.get_user_by_email(
	_email text)
    RETURNS TABLE(id integer, name character varying, email character varying, password character varying, created_at timestamp with time zone, updated_at timestamp with time zone) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
  RETURN QUERY
    SELECT u.id, u.name, u.email, u.password, u.created_at, u.updated_at
    FROM public.users u
    WHERE u.email = _email;

  IF NOT FOUND THEN
    RETURN;
  END IF;
END;
$BODY$;

ALTER FUNCTION public.get_user_by_email(text)
    OWNER TO postgres;


-- FUNCTION: public.get_user_by_id(integer)

-- DROP FUNCTION IF EXISTS public.get_user_by_id(integer);

CREATE OR REPLACE FUNCTION public.get_user_by_id(
	id_user integer)
    RETURNS TABLE(id integer, name character varying, email character varying, created_at timestamp with time zone, updated_at timestamp with time zone) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$

BEGIN
  RETURN QUERY
    SELECT u.id, u.name, u.email, u.created_at, u.updated_at
    FROM public.users u
    WHERE u.id = id_user;

  IF NOT FOUND THEN
    RETURN;
  END IF;
END;
$BODY$;

ALTER FUNCTION public.get_user_by_id(integer)
    OWNER TO postgres;
-- FUNCTION: public.insert_user(text, text, text)

-- DROP FUNCTION IF EXISTS public.insert_user(text, text, text);

CREATE OR REPLACE FUNCTION public.insert_user(
	_name text,
	_email text,
	_pass text)
    RETURNS integer
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$

BEGIN
   INSERT INTO public.users (name, email, password)
  VALUES (_name, _email, _pass);

  -- Devolvemos el ID generado por la tabla
  RETURN currval('public.users_id_seq');
END;
$BODY$;

ALTER FUNCTION public.insert_user(text, text, text)
    OWNER TO postgres;


-- FUNCTION: public.verifyemail(text)

-- DROP FUNCTION IF EXISTS public.verifyemail(text);

CREATE OR REPLACE FUNCTION public.verifyemail(
	email_user text)
    RETURNS TABLE(email character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$

BEGIN
  RETURN QUERY
    SELECT u.email
    FROM public.users u
    WHERE u.email = email_user;

  IF NOT FOUND THEN
    RETURN;
  END IF;
END;
$BODY$;

ALTER FUNCTION public.verifyemail(text)
    OWNER TO postgres;
