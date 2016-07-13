require 'test_helper'

class StaticPagesControllerTest < ActionController::TestCase
  test "should get play" do
    get :play
    assert_response :success
  end

end
