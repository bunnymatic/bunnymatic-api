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

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
