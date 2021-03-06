Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"

  namespace :api, defaults: {format: :json} do

    resources :events, only: [:create, :update, :destroy] do
      collection do
        get 'getMonth'
      end
    end

  end

end
