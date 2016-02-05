<?php

/**
 * Fancy Dev Build base class
 *
 * @package DevTasks
 *
 */
class DevTasks extends LeftAndMainExtension implements PermissionProvider
{

    public function init()
    {
        parent::init();

        if (!Permission::check("VIEW_DEVTASKS")) {
            return;
        }

        $default_tasks = array(
            'devbuild' => array(
                'title' => 'Dev/Build',
                'link' => 'dev/build',
                'reset_time' => '5000',
                'error_markup'=> '.xdebug-error,.xe-parse-error',
                'error_handler' => 'newtab',
                'success_markup'=> 'li[style="color: blue"],li[style="color: green"]',
                'success_handler' => 'ignore'
            )
        );

        $config_tasks = Config::inst()->get(__CLASS__, 'tasks');

        if (is_array($config_tasks)) {
            $tasks = array_merge($default_tasks, $config_tasks);
        }else{
            $tasks = $default_tasks;
        }

        foreach ($tasks as $item => $values) {

            $attributes = array(
                'class' => 'devbuild-trigger',
                'data-title' => (isset($values['title']) ? $values['title'] : $item),
                'data-link' => (isset($values['link']) ? $values['link'] : $default_tasks['devbuild']['link']),
                'data-reset-time' => (isset($values['reset_time']) ? $values['reset_time'] : $default_tasks['devbuild']['reset_time']),
                'data-error-markup' => (isset($values['error_markup']) ? $values['error_markup'] : $default_tasks['devbuild']['error_markup']),
                'data-error-handler' => (isset($values['error_handler']) ? $values['error_handler'] : $default_tasks['devbuild']['error_handler']),
                'data-success-markup' => (isset($values['success_markup']) ? $values['success_markup'] : $default_tasks['devbuild']['success_markup']),
                'data-success-handler' => (isset($values['success_handler']) ? $values['success_handler'] : $default_tasks['devbuild']['success_handler'])
            );

            // priority controls the ordering of the link in the stack. The
            // lower the number, the lower in the list
            $priority = -90;

            CMSMenu::add_link($item, '', '#', $priority, $attributes);

        }
    }

    public function providePermissions()
    {
        return array(
            "VIEW_DEVTASKS" => "Access dev task menu",
        );
    }

}

?>
