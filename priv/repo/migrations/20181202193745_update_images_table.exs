defmodule BunnymaticApi.Repo.Migrations.UpdateImagesTable do
  use Ecto.Migration

  def up do
    alter table(:images) do
      remove :description
      add :price, :string
    end
    rename table(:images), :name, to: :title
  end

  def down do
    alter table(:images) do
      add :description, :string
      remove :price
    end
    rename table(:images), :title, to: :name
  end
end
