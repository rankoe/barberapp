-- Crear tabla de perfiles de usuario
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Crear tabla de servicios
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL, -- en minutos
  price DECIMAL(10,2) NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Crear tabla de citas
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles ON DELETE CASCADE,
  service_id UUID REFERENCES services ON DELETE CASCADE,
  service_name TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  barber TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  total_price DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Crear tabla de barberos
CREATE TABLE barbers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insertar servicios por defecto
INSERT INTO services (name, description, duration, price) VALUES
('Corte de Pelo', 'Corte profesional con estilo moderno adaptado a tu tipo de cabello', 30, 15.00),
('Afeitado Clásico', 'Afeitado tradicional con navaja caliente, toallas calientes y productos de alta calidad', 20, 12.00),
('Arreglo de Barba', 'Diseño y mantenimiento profesional de barba con recorte y perfilado preciso', 15, 10.00),
('Paquete Completo', 'Corte + Afeitado + Arreglo de barba. La experiencia completa de barbería', 60, 30.00),
('Corte Infantil', 'Corte especial para niños con paciencia y cuidado, hasta 12 años', 25, 12.00),
('Tratamiento Capilar', 'Tratamiento profundo para cabello dañado con productos profesionales', 45, 20.00);

-- Insertar barberos por defecto
INSERT INTO barbers (name, email, phone) VALUES
('Carlos Rodríguez', 'carlos@barberstudio.com', '+34 600 123 456'),
('Miguel Ángel', 'miguel@barberstudio.com', '+34 600 123 457'),
('David López', 'david@barberstudio.com', '+34 600 123 458');

-- Políticas RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE barbers ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas para appointments
CREATE POLICY "Users can view own appointments" ON appointments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own appointments" ON appointments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own appointments" ON appointments
  FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para services (todos pueden leer)
CREATE POLICY "Anyone can view services" ON services
  FOR SELECT USING (true);

-- Políticas para barbers (todos pueden leer)
CREATE POLICY "Anyone can view barbers" ON barbers
  FOR SELECT USING (true);
