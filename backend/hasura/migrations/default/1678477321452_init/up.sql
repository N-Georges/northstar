CREATE EXTENSION pgcrypto;

CREATE TABLE users(
  id uuid DEFAULT gen_random_uuid() UNIQUE,
  first_name text,
  last_name text,
  email text UNIQUE,
  phone text,
  locale text,
  role text,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY(id)
); 

CREATE TABLE company(
  id uuid DEFAULT gen_random_uuid() UNIQUE,
  name text,
  email text,
  phone text,
  website text,
  size text,
  admin_id uuid,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (admin_id) REFERENCES users(id),
  PRIMARY KEY(id)
);

CREATE TABLE company_administrator(
  id uuid DEFAULT gen_random_uuid() UNIQUE,
  user_id uuid,
  company_id uuid,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (company_id) REFERENCES company(id),
  PRIMARY KEY(id)
);

CREATE TABLE applicant(
  id uuid DEFAULT gen_random_uuid() UNIQUE,
  user_id uuid,
  profession text,
  profession_level text,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id),
  PRIMARY KEY(id)
);
