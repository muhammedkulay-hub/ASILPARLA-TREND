"""Add premium plan fields to users table

Revision ID: 001
Revises: 
Create Date: 2024-11-24 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Users tablosuna premium plan alanları ekle
    op.add_column('users', sa.Column('plan_type', sa.String(), server_default='free', nullable=True))
    op.add_column('users', sa.Column('is_premium', sa.Boolean(), server_default='false', nullable=True))
    op.add_column('users', sa.Column('is_unlimited', sa.Boolean(), server_default='false', nullable=True))
    op.add_column('users', sa.Column('plan_expires_at', sa.DateTime(timezone=True), nullable=True))
    
    # Eğer users tablosu yoksa oluştur
    # (İlk migration ise tüm tabloları oluşturur)
    pass


def downgrade() -> None:
    # Premium plan alanlarını kaldır
    op.drop_column('users', 'plan_expires_at')
    op.drop_column('users', 'is_unlimited')
    op.drop_column('users', 'is_premium')
    op.drop_column('users', 'plan_type')

