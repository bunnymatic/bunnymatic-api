# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :bunnymaticApi,
  ecto_repos: [BunnymaticApi.Repo]

# Configures the endpoint
config :bunnymaticApi, BunnymaticApiWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "nSB+8sQchS5gb2YzdRajaaATOy0wLHYdBTE1Am7VgiS4cMtauJqTKoaNCdJeRCsS",
  render_errors: [view: BunnymaticApiWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: BunnymaticApi.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

config :mime, :types, %{
  "application/json" => ["json"]
}

config :ex_aws,
  access_key_id: System.get_env("AWS_ACCESS_KEY_ID"),
  secret_access_key: System.get_env("AWS_SECRET_ACCESS_KEY"),
  region: System.get_env("S3_REGION"),
  bucket: System.get_env("S3_BUCKET")


config :extus,
  storage: ExTus.Storage.Local,
  base_dir: "uploads",
  expired_after: 24 * 60 * 60 * 1000, # clean incomplete uploads after 1 day
  clean_interval: 60 * 60 * 1000 # start clean job after 60 minutes

  # if we use ExTus.Storage.S3...
  # AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are used from the environment
  # read https://github.com/ex-aws/ex_aws for more info

config :bunnymaticApi, BasicAuth,
  username: System.get_env("BASIC_AUTH_USER"),
  password: System.get_env("BASIC_AUTH_PASS")


# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
