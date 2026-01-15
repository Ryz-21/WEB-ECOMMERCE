-- Agregar columnas a la tabla Sale para soportar tokens de invitados y estado de pago

-- Agregar columna guest_token a la tabla sale
ALTER TABLE sale ADD COLUMN guest_token VARCHAR(255) NULL UNIQUE;

-- Agregar columna payment_status a la tabla payment_info (embeddable)
-- Nota: En Hibernate, los embeddables se almacenan en las columnas de la tabla principal
-- Por lo tanto, agregamos la columna payment_status directamente a la tabla sale
ALTER TABLE sale ADD COLUMN payment_status VARCHAR(50) DEFAULT 'PENDING';

-- Crear índice para búsquedas rápidas por guest_token
CREATE INDEX idx_guest_token ON sale(guest_token);
